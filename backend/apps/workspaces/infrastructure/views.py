from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Workspace
from .serializers import WorkspaceCreateSerializer

class WorkspaceCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = WorkspaceCreateSerializer(data=request.data)
        if serializer.is_valid():
            workspace = Workspace.objects.create(name=request.data['name'],
                                                 description=request.data.get('description', ''),
                                                 created_by=request.user)

            return Response({'id': workspace.id})            
        
        return Response({'message': 'Invalid data'}, 
                        status=status.HTTP_400_BAD_REQUEST)
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    
    
    
    
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from apps.workspaces.infrastructure.serializers import WorkspaceCreateSerializer
# from apps.workspaces.domain.services import create_workspace_for_user

# class WorkspaceCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = WorkspaceCreateSerializer(data=request.data)
#         if serializer.is_valid():
#             workspace = create_workspace_for_user(
#                 user=request.user,
#                 name=serializer.validated_data['name'],
#                 description=serializer.validated_data.get('description', '')
#             )
#             return Response({
#                 "id": workspace.id,
#                 "name": workspace.name,
#                 "description": workspace.description
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
