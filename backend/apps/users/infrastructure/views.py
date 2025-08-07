from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from apps.users.infrastructure.serializers import SignUpSerializer


class SignUpView(APIView):
    
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Usuario registrado", "username": user.username}, 
                            status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SignInView(APIView):
    
    def post(self, request):
        user = authenticate(username=request.data['username'], 
                            password=request.data['password']) # Verify user
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, 
                            status=status.HTTP_200_OK)
        
        return Response({"message": "Invalid credentials"}, 
                        status=status.HTTP_401_UNAUTHORIZED)