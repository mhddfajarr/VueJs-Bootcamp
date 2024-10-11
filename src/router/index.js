import { createWebHistory, createRouter } from 'vue-router'; 
import Login from '../components/Auth/login.vue';
import Dashboard from '../components/Pages/Dashboard.vue';
import MainLayout from '../components/Layout/mainLayout.vue';
import University from '../components/Pages/University.vue';
import Role from '../components/Pages/Role.vue';
import AccountRole from '../components/Pages/AccountRole.vue';
import Register from '../components/Pages/Register.vue';
const routes = [
  { 
    path: '/login', 
    name: "login", 
    component: Login 
    },
  { 
    path: '/', 
    component: MainLayout,
    children:[
      {path: "/dashboard",
        name: 'dashboard',
        component: Dashboard
      },
      {path: "/university",
        name: 'university',
        component: University
      },
      {path: "/register",
        name: 'register',
        component: Register
      },
      {path: "/role",
        name: 'role',
        component: Role
      },
      {path: "/accountRole",
        name: 'accountRole',
        component: AccountRole
      },
      
    ]
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;