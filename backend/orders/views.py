from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from customers.models import Customer
from .models import Order

@csrf_exempt
def create_order(request):
    if request.method == "POST":
        data = json.loads(request.body)

        # Extract customer details
        name = data.get("full_name")
        email = data.get("email")
        phone = data.get("phone")

        customer, _ = Customer.objects.get_or_create(
            email=email,
            defaults={"full_name": name, "phone": phone}
        )

        # Create order
        order = Order.objects.create(
            customer=customer,
            items=data.get("cartItems", []),
            total_amount=data.get("total"),
            payment_method=data.get("payment_method"),
            transaction_ref=data.get("tx_ref"),
            status="Pending"
        )

        return JsonResponse({"message": "Order saved", "order_id": order.id}, status=201)

    return JsonResponse({"error": "Invalid request method"}, status=400)
