from rest_framework import serializers
from .models import Order
from customers.models import Customer

class OrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.full_name', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'customer_name', 'items', 'total_amount',
            'payment_method', 'transaction_ref', 'status', 'created_at'
        ]
