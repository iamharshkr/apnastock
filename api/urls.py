from django.urls import path
from . import views

urlpatterns = [
    path('stock/<str:pk>', views.stock, name='stock'),
    path('search/<str:pk>', views.searchStock, name='searchStock'),
    path('stocks-list', views.stocksList, name='stocksList'),
    path('top-gainer', views.topGainer, name='topGainer'),

]