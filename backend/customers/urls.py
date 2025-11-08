from django.urls import path
from .views import create_customer, list_customers, get_customer_by_email

urlpatterns = [
    path('', list_customers, name='list_customers'),
    path('create/', create_customer, name='create_customer'),
    path('<str:email>/', get_customer_by_email, name='get_customer_by_email'),
]
