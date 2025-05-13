const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'doctors',
        name: 'doctor-list',
        component: () => import('pages/doctor/DoctorListPage.vue')
      },
      {
        path: 'doctors/add',
        name: 'doctor-add',
        component: () => import('pages/doctor/DoctorAddPage.vue')
      },
      // {
      //   path: 'doctors/:id/edit',
      //   name: 'doctor-edit',
      //   component: () => import('pages/doctor/DoctorEditPage.vue')
      // },
      // {
      //   path: 'doctors/:id',
      //   name: 'doctor-profile',
      //   component: () => import('pages/doctor/DoctorProfilePage.vue')
      // },
      // {
      //   path: 'doctors/:id/schedule',
      //   name: 'doctor-schedule',
      //   component: () => import('pages/doctor/DoctorSchedulePage.vue')
      // },
      {
        path: 'appointments',
        name: 'appointment-list',
        component: () => import('pages/appointment/AppointmentListPage.vue')
      },
      {
        path: 'appointments/create',
        name: 'appointment-create',
        component: () => import('pages/appointment/AppointmentCreatePage.vue')
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('pages/reports/ReportsPage.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/settings/SettingsPage.vue')
      },
      {
        path: 'appointment-history',
        name: 'appointment-history',
        component: () => import('pages/appointment/AppointmentHistoryPage.vue')
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: () => import('pages/doctor/DoctorSchedulePage.vue')
      },
      // Add new auth routes
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/RegisterPage.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('pages/user/ProfilePage.vue'),
        meta: { requiresAuth: true }  // This route requires authentication
      },
      {
        path: 'tailwind-buttons',
        name: 'tailwind-buttons',
        component: () => import('pages/TailwindButtonsPage.vue')
      }
    ]
  }
]

export default routes
