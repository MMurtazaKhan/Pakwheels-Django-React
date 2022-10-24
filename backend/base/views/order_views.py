from datetime import datetime
from base.serializers import *
from base.models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import status



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']
    if orderItems and len(data['orderItems']) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice']
        )

        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country']
        )

        for i in orderItems:
            product = Product.objects.get(_id = i['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url
             )

        product.countInStock -= item.qty
        product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrderById(request, pk):
    
    user = request.user 
    try:
        order = Order.objects.get(_id = pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many = False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authenticated to view this order'}, status= status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many = True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):

    user = request.user 
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many = True)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToDelivered(request, pk):

    order = Order.objects.get(_id = pk)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order Delivered')



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):

    order = Order.objects.get(_id = pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order Paid')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cancelOrder(request, pk):
    order = Order.objects.get(_id = pk)
    order.delete()
    return Response('Order deleted')