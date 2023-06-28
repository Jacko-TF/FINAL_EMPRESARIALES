from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import  viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Estudiante, Semestre, Seccion, Ciclo, Departamento, Carrera, Curso, Matricula, Pago
from .serializers import EstudianteSerializer, SemestreSerializer, SeccionSerializer, CarreraSerializer, CicloSerializer, DepartamentoSerializer, CursoSerializer, MatriculaSerializer, PagoSerializer
class HomeView(APIView):
     
   permission_classes = (IsAuthenticated, )
   def get(self, request):
       content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
       return Response(content)

class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
          
#APLICACION MATRICULAAPP
class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all().order_by('apellido')
    serializer_class = EstudianteSerializer
    permission_classes = [IsAuthenticated,]

class SemestreViewSet(viewsets.ModelViewSet):
    queryset = Semestre.objects.all().order_by('id')
    serializer_class = SemestreSerializer
    permission_classes = [IsAuthenticated,]


class CicloViewSet(viewsets.ModelViewSet):
    queryset = Ciclo.objects.all().order_by('id')
    serializer_class = CicloSerializer
    permission_classes = [IsAuthenticated,]

class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all().order_by('id')
    serializer_class = DepartamentoSerializer
    permission_classes = [IsAuthenticated,]

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all().order_by('id')
    serializer_class = CarreraSerializer
    permission_classes = [IsAuthenticated,]

class SeccionViewSet(viewsets.ModelViewSet):
    queryset = Seccion.objects.all().order_by('id')
    serializer_class = SeccionSerializer
    permission_classes = [IsAuthenticated,]

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all().order_by('id')
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated,]

class MatriculaViewSet(viewsets.ModelViewSet):
    queryset = Matricula.objects.all().order_by('id')
    serializer_class = MatriculaSerializer
    permission_classes = [IsAuthenticated,]

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all().order_by('id')
    serializer_class = PagoSerializer
    permission_classes = [IsAuthenticated,]