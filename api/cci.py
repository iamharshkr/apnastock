import pandas as pd
# Commodity Channel Index


def CCI(df, ndays=14):
    copy = df.copy()
    copy['TP'] = (copy['high'] + copy['low'] + copy['close']) / 3
    copy['sma'] = copy['TP'].rolling(ndays).mean()
    copy['mad'] = copy['TP'].rolling(ndays).apply(lambda x: pd.Series(x).mad())
    copy['CCI'] = (copy['TP'] - copy['sma']) / (0.015 * copy['mad'])
    return copy['CCI']


def add_stochastic_oscillator(df, periods=14):
    copy = df.copy()

    high_roll = copy["high"].rolling(periods).max()
    low_roll = copy["low"].rolling(periods).min()

    # Fast stochastic indicator
    num = copy["close"] - low_roll
    denom = high_roll - low_roll
    copy["overbought"] = (num / denom) * 100

    # Slow stochastic indicator
    copy["oversold"] = copy["overbought"].rolling(3).mean()

    return copy
