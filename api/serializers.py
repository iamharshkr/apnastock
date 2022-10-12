from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Stock

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'