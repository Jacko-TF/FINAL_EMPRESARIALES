from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import  viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Estudiante, Semestre, Seccion, Ciclo, Departamento, Carrera, Curso, Matricula, Pago
from .serializers import EstudianteSerializer, SemestreSerializer, SeccionSerializer, CarreraSerializer, CicloSerializer, DepartamentoSerializer, CursoSerializer, MatriculaSerializer, PagoSerializer
from django.contrib.auth.models import User
from datetime import datetime,date

class HomeView(APIView):
   permission_classes = (IsAuthenticated, )
   def get(self, request):
       content = {'message': 'Bienvenido a nuestro sistema de matricula Tecsup'}
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

class RegisterView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        try:
            username = request.data["username"]
            password = request.data["password"]
            email = request.data["email"]
            user = User.objects.create_user(username, email, password)
            user.save()
            if(User.objects.filter(username=username, email = email, password=password).exists()):
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST) 

class CicloActualView(APIView):
    permission_classes = (AllowAny,)
    def get(self,request):
        ciclos = Ciclo.objects.filter(semestre__fecha_inicio__gt=date.today())
        serializer = CicloSerializer(ciclos, many=True, context={'request': request})
        return Response(serializer.data)

class MatricularView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        try:
            estudiante_id = request.data['estudiante']
            ciclo_id = request.data['ciclo']
            carrera_id = request.data['carrera']
            fecha = datetime.now().date()
            if(Ciclo.objects.filter(id=ciclo_id).exists()):
                seccion = Seccion.objects.get(carrera=carrera_id,ciclo=ciclo_id)
                seccion_id = seccion.id
                matricula = Matricula.objects.create(fecha,estudiante_id,seccion_id)
                matricula.save()
                return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

#APLICACION MATRICULAAPP
class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all().order_by('apellido')
    serializer_class = EstudianteSerializer
    permission_classes = [AllowAny,]

class SemestreViewSet(viewsets.ModelViewSet):
    queryset = Semestre.objects.all().order_by('id')
    serializer_class = SemestreSerializer
    permission_classes = [IsAuthenticated,]


class CicloViewSet(viewsets.ModelViewSet):
    queryset = Ciclo.objects.all().order_by('id')
    serializer_class = CicloSerializer
    permission_classes = [AllowAny,]

class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all().order_by('id')
    serializer_class = DepartamentoSerializer
    permission_classes = [IsAuthenticated,]

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all().order_by('id')
    serializer_class = CarreraSerializer
    permission_classes = [AllowAny,]

class SeccionViewSet(viewsets.ModelViewSet):
    queryset = Seccion.objects.all().order_by('id')
    serializer_class = SeccionSerializer
    permission_classes = [AllowAny,]

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all().order_by('id')
    serializer_class = CursoSerializer
    permission_classes = [AllowAny,]

class MatriculaViewSet(viewsets.ModelViewSet):
    queryset = Matricula.objects.all().order_by('id')
    serializer_class = MatriculaSerializer
    permission_classes = [AllowAny,]

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all().order_by('id')
    serializer_class = PagoSerializer
    permission_classes = [AllowAny,]