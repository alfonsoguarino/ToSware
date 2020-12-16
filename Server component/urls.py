from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^prendi/$', views.prendi, name='prendi'),
    url(r'^embed/$', views.embed, name='embed'),
    #url('', views.prendi),
]