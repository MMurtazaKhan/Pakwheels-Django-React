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
@permission_classes([IsAdminUser])
def AddProduct(request):
    user = request.user 
    data = request.data 
    
    product = Product.objects.create(
        user = user,
        name = data['name'],
        image = data['image'],
        brand = data['brand'],
        category = data['category'],
        description = data['description'],
        price = data['price'],
        countInStock = data['countInStock'],
    ) 

    serializer = ProductSerializer(product, many = False)
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many = True)
    return Response(serializer.data)


@api_view(['GET'])
def getProductById(request, pk):
    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product, many = False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id = pk)
    product.delete()
    return Response('Product Deleted')



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    product = Product.objects.get(_id = pk)
    data = request.data 

    product.name = data['name']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.image = data['image']
    product.price = data['price']
    product.countInStock = data['countInStock']

    product.save()
    serializer = ProductSerializer(product, many = False)
    return Response(serializer.data)