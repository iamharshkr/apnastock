from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import yfinance as yf
import ta
from nsetools import Nse
from rest_framework import status
from .models import Stock
from .serializers import StockSerializer
from django.db.models import Q
from .cci import CCI, add_stochastic_oscillator

nse = Nse()


@api_view(['GET'])
def home(request):
    return Response('Silience is peace!')


@api_view(['GET'])
def stocksList(request):
    stocks = Stock.objects.all()
    serialized = StockSerializer(stocks, many=True)
    return Response(serialized.data)


@api_view(['GET'])
def searchStock(request, pk):
    try:
        if len(pk) > 1:
            qs = Q(Name__icontains=pk) | Q(Symbols__icontains=pk)
            results = Stock.objects.filter(qs)
            serialized = StockSerializer(results, many=True)
            return Response(serialized.data)
        else:
            raise Exception
    except:
        data = [{
            "status": "Fail",
            "error": "No Result Found.",
            "data": ""
        }]

        return Response(data, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def topGainer(request):
    try:

        top_gainer = nse.get_top_gainers()
        top_loser = nse.get_top_losers()
        data = [{
            "status": "Success",
            "error": "",
            "data": {
                "gainers": top_gainer,
                "losers": top_loser
            }
        }]

        return Response(data)
    except:
        data = [{
            "status": "Fail",
            "error": "Something went wrong.",
            "data": ""
        }]

        return Response(data, status=status.HTTP_503_SERVICE_UNAVAILABLE)


@api_view(['GET'])
def stock(request, pk):
    def feature_engineering(symbol):
        """ Create new variables"""

        # Import the data
        df = yf.download(symbol).dropna()

        # Rename
        df.columns = ["open", "high", "low", "close", "adj close", "volume"]
        df.index.name = "time"

        # Remove adj close
        del df["adj close"]

        # We copy the dataframe to avoid interferences in the data
        df_copy = df.copy()

        # Create the returns
        df_copy["returns"] = df_copy["close"].pct_change(1)

        # Create the SMAs
        df_copy["SMA"] = ta.trend.sma_indicator(
            df_copy["close"], window=12, fillna=False)

        # Market Capitalisation
        df_copy["MarketCap"] = df_copy['open'] * df_copy['volume']

        # Bollinger Bands
        # Initialize Bollinger Bands Indicator
        indicator_bb = ta.volatility.BollingerBands(
            close=df_copy["close"], window=20, window_dev=2)

        # Add Bollinger Bands features
        df_copy['bb_bbh'] = indicator_bb.bollinger_hband()
        df_copy['bb_bbl'] = indicator_bb.bollinger_lband()

        # Add Bollinger Band high indicator
        df_copy['bb_bbhi'] = indicator_bb.bollinger_hband_indicator()
        # Add Bollinger Band low indicator
        df_copy['bb_bbli'] = indicator_bb.bollinger_lband_indicator()

        # Stochastic Oscillator
        StochasticOscillator = add_stochastic_oscillator(df_copy)
        df_copy['overbought'] = StochasticOscillator['overbought']
        df_copy['oversold'] = StochasticOscillator['oversold']

        # Commodity Channel Index
        df_copy['cci'] = CCI(df_copy, 14)

        # Create the Rsi
        RSI = ta.momentum.RSIIndicator(
            df_copy["close"], window=14, fillna=False)
        df_copy["RSI"] = RSI.rsi().shift(1)

        return df_copy.dropna()

    try:
        opt = request.GET.get('opt', None)
        count = request.GET.get('count', None)
        key = None
        if opt == 'nse':
            key = '.NS'
        elif opt == 'bse':
            key = '.BO'
        else:
            raise Exception

        if count and int(count) != 0:
            k_count = int('-'+count)
        else:
            k_count = -30

        f_symbol = (pk + key).upper()
        if (nse.is_valid_code(pk)):
            ext_data = nse.get_quote(pk)
        else:
            raise Exception
        df = feature_engineering(f_symbol)

        data = [{
                "status": "Success",
                "error": "",
                "data": {
                    "market": ext_data,
                    "Open": df['open'][k_count:],
                    "High": df['high'][k_count:],
                    "Low": df['low'][k_count:],
                    "Returns": df['returns'][k_count:],
                    "SMA": df['SMA'][k_count:],
                    "bb_bbh": df['bb_bbh'][k_count:],
                    "bb_bbl": df['bb_bbl'][k_count:],
                    "bb_bbhi": df['bb_bbhi'][-1:],
                    "bb_bbli": df['bb_bbli'][-1:],
                    "cci": df['cci'][k_count:],
                    "overbought": df['overbought'][k_count:],
                    "oversold": df['oversold'][k_count:],
                    "MarketCap": df['MarketCap'][k_count:],
                    "RSI": df['RSI'][k_count:],
                    "Closing_Price": {
                        "Date": df.index[k_count:],
                        "Price": df['close'][k_count:]
                    }
                }
                }]
        return Response(data)
    except:
        return Response({
            "status": "Fail",
            "error": "Data Not Found",
            "Data": ""
        }, status=status.HTTP_404_NOT_FOUND)
