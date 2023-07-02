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
import random
from django.db.models import Count


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
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            estudianteId = request.data['estudiante']
            cicloId = request.data['ciclo']
            carreraId = request.data['carrera']
            fecha = datetime.now().date()
            ciclo = Ciclo.objects.get(id=cicloId)
            carrera = Carrera.objects.get(id=carreraId)

            if(Seccion.objects.filter(ciclo=ciclo,carrera=carrera).exists()):
                seccion = Seccion.objects.filter(ciclo=ciclo,carrera=carrera)
                if(Estudiante.objects.filter(id=estudianteId).exists()):
                    estudiante=Estudiante.objects.get(id=estudianteId)
                    secciones = []
                    for e in seccion :
                        secciones.append(e.id)
                    print(secciones)
                    seccion_aleatoria = random.choice(secciones)
                    matricula = Matricula.objects.create(fecha=fecha,estudiante=estudiante,seccion=Seccion.objects.get(id=seccion_aleatoria))
                    matricula.save()
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
#CONSULTAS MATRÍCULA        
class MatriculadosPorCicloView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        ciclos = Ciclo.objects.annotate(matriculados=Count('seccion__matricula')).values('nombre','semestre__nombre', 'matriculados')
        return Response(ciclos)
class MatriculadosPorCarreraView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        carreras = Carrera.objects.annotate(matriculados=Count('seccion__matricula')).values('nombre', 'matriculados')
        return Response(carreras)
class MatriculadosPorDepartamentoView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        departamentos = Departamento.objects.annotate(matriculados=Count('carrera__seccion__matricula')).values('nombre', 'matriculados')
        return Response(departamentos)

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
    permission_classes = [IsAuthenticated,]

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
    permission_classes = [AllowAny,]