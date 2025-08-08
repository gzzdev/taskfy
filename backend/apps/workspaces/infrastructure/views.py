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

            return Response({'message': f'Workspace {workspace.name} created', 
                             'created_at': workspace.created_at,
                             'id': workspace.id})            
        
        return Response({'message': 'Invalid data'}, 
                        status=status.HTTP_400_BAD_REQUEST)
        
        