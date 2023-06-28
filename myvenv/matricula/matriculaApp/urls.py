from django.urls import path, include
from . import views
from rest_framework import routers

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
    path('logout/', views.LogoutView.as_view(), name ='logout')
]