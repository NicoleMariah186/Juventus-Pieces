from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Include your apps' URLs
    path('api/orders/', include('orders.urls')),
    path('api/customers/', include('customers.urls')),
]
