from django.test import TestCase
from apps.users.models import TaskfyUser

class UserTest(TestCase):
    
    # @classmethod
    def setUp(cls):
        cls.test_user = TaskfyUser(email='cuzztomgdev@gmail.com', password='12345')
        cls.test_user.save()
        
    def test_sign_up(self):
        pass
        
        
        
    
    # def test_get_by_id(self):
    #     self.assertEqual(TaskfyUser.get_by_id("garellano"), self.test_user)
    
    
    # def tearDown(self):
    #     self.test_user.delete()