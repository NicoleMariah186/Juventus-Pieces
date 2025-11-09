from django.contrib import admin
from django.urls import path, include
from customers.views import checkout


urlpatterns = [
    path('admin/', admin.site.urls),
   # path('', home, name='home'),       
# Include your apps' URLs
    path('api/orders/', include('orders.urls')),
    path('api/customers/', include('customers.urls')),
]
