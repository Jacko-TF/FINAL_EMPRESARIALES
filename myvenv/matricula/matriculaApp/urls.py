from django.urls import path, include
from . import views
from rest_framework import routers

from matriculaApp.views import MatriculadosPorCarreraView
from matriculaApp.views import MatriculadosPorCicloView
from matriculaApp.views import MatriculadosPorDepartamentoView


app_name = "matriculaApp"

router =routers.DefaultRouter()
router.register(r'estudiantes', views.EstudianteViewSet)
router.register(r'semestres', views.SemestreViewSet)
router.register(r'ciclos', views.CicloViewSet)
router.register(r'departamentos', views.DepartamentoViewSet)
router.register(r'carreras', views.CarreraViewSet)
router.register(r'secciones', views.SeccionViewSet)
router.register(r'cursos', views.CursoViewSet)
router.register(r'matriculas', views.MatriculaViewSet)
router.register(r'pagos', views.PagoViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('home/', views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('register/', views.RegisterView.as_view(), name ='register'),
    path('matricular/',views.MatricularView.as_view(), name='matricular'),
    path('cicloActual/',views.CicloActualView.as_view(), name='cicloActual'),

    path('matriculados-por-carrera/', MatriculadosPorCarreraView.as_view(), name='matriculados-por-carrera'),
    path('matriculados-por-ciclo/', MatriculadosPorCicloView.as_view(), name='matriculados-por-ciclo'),
    path('matriculados-por-departamento/', MatriculadosPorDepartamentoView.as_view(), name='matriculados-por-departamento'),


]