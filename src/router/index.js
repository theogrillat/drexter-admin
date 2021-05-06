import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import { firebase } from "../firebase";
import store from "../store";

Vue.use(VueRouter)

// const contestRoutes = [
//   {
//     path: '/constestation-first',
//     name: 'form',
//     component: () => import('../components/processContest/form.vue'),
//   },
// ]

// const profileRoutes = [
//   {
//     path: '/profile',
//     name: 'Profile',
//     component: () => import('../views/Profile.vue'),
//     props: true,
//     meta: {
//       requiresAuth: true
//     }
//   },
//   {
//     path: '/profile/dossiers/:id',
//     name: 'Details',
//     component: () => import('../components/profileViews/Doc.vue'),
//     props: true,
//     meta: {
//       requiresAuth: true
//     }
//   },
// ];

const adminRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Admin.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/dossiers/:id',
    name: 'Details',
    component: () => import('../components/profileViews/Doc.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      loginn: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home,
    // },
    // {
    //   path: '/constestation',
    //   name: 'Constestation',
    //   component: () => import('../views/Constestation.vue'),
    // },
    // {
    //   path: '/remises',
    //   name: 'Remise',
    //   component: () => import('../views/Remise.vue'),
    // },
    // {
    //   path: '/sollicitations',
    //   name: 'Sollicitations',
    //   component: () => import('../views/Sollicitations.vue'),
    // },
    // {
    //   path: '/aides',
    //   name: 'Aides',
    //   component: () => import('../views/Aides.vue'),
    // },
    // {
    //   path: '/tarifs',
    //   name: 'Tarifs',
    //   component: () => import('../views/Tarifs.vue'),
    // },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: () => import('../views/Login.vue'),
    //   meta: {
    //     loginn: true
    //   }
    // },
    // {
    //   path: '/CGVU',
    //   name: 'CGVU',
    //   component: () => import('../views/CGVU.vue'),
    //   meta: {
    //     requiresAuth: false
    //   }
    // },
    // {
    //   path: '/RGPD',
    //   name: 'RGPD',
    //   component: () => import('../views/RGPD.vue'),
    //   meta: {
    //     requiresAuth: false
    //   }
    // },
    // {
    //   path: '/FAQ',
    //   name: 'FAQ',
    //   component: () => import('../views/FAQ.vue'),
    //   meta: {
    //     requiresAuth: false
    //   }
    // },
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: () => import('../views/About.vue'),
    //   meta: {
    //     requiresAuth: false
    //   }
    // },
    // {
    //   path: '/mentions',
    //   name: 'Mentions',
    //   component: () => import('../views/Mentions.vue'),
    //   meta: {
    //     requiresAuth: false
    //   }
    // },
    // ...contestRoutes,
    // ...profileRoutes
    ...adminRoutes
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
      behavior: 'smooth',
    }
  }
})

const showToastError = (text) => {
  Vue.$toast.error(text, {
    position: "bottom-center",
    timeout: 6000,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: false,
    icon: true,
    rtl: false,
  });
};

// const showToastSuccess = (text) => {
//   this.$toast.success(text, {
//     position: "bottom-center",
//     timeout: 6000,
//     closeOnClick: false,
//     pauseOnFocusLoss: false,
//     pauseOnHover: false,
//     draggable: false,
//     draggablePercent: 0.6,
//     showCloseButtonOnHover: false,
//     hideProgressBar: false,
//     closeButton: false,
//     icon: true,
//     rtl: false,
//   });
// };

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const loginn = to.matched.some(record => record.meta.loginn);
  console.log(to);
  console.log(requiresAuth);
  console.log(loginn);
  if (!requiresAuth && !loginn) {
    store.commit('setActivePage', to.name);
    next();
  } else if (requiresAuth && !await firebase.getCurrentUser()) {
    store.commit('setLoggedIn', false);
    store.commit('setActivePage', 'Login');
    next('/login');
  } else if (requiresAuth && await firebase.getCurrentUser()) {
    store.commit('setLoggedIn', true);
    store.commit('setActivePage', to.name);
    next();
  } else if (loginn && !await firebase.getCurrentUser()) {
    store.commit('setLoggedIn', false);
    store.commit('setActivePage', to.name);
    next();
  } else if (loginn && await firebase.getCurrentUser() && from.name != 'Constestation') {
    console.log('ici');
    store.commit('setLoggedIn', true);
    store.commit('setActivePage', to.Home);
    next('/');
  } else if (from.name == 'Constestation' && to.name == 'Login' && await firebase.getCurrentUser()) {

    showToastError('Pas connecté');
  }
});

export default router
