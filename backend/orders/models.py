from django.db import models
from customers.models import Customer

class Order(models.Model):
    PAYMENT_METHODS = [
        ('mobile', 'Mobile Money'),
        ('bank', 'Bank Transfer'),
    ]

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Paid', 'Paid'),
        ('Failed', 'Failed'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    items = models.JSONField()  # Stores all cart items
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHODS)
    transaction_ref = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer.full_name}"
