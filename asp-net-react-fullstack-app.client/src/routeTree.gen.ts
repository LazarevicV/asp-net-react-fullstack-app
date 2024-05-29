/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SchoolsImport } from './routes/schools'
import { Route as RoadmapsImport } from './routes/roadmaps'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as CoursesImport } from './routes/courses'
import { Route as AdminImport } from './routes/admin'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SchoolsRoute = SchoolsImport.update({
  path: '/schools',
  getParentRoute: () => rootRoute,
} as any)

const RoadmapsRoute = RoadmapsImport.update({
  path: '/roadmaps',
  getParentRoute: () => rootRoute,
} as any)

const RegisterRoute = RegisterImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const CoursesRoute = CoursesImport.update({
  path: '/courses',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/courses': {
      id: '/courses'
      path: '/courses'
      fullPath: '/courses'
      preLoaderRoute: typeof CoursesImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/roadmaps': {
      id: '/roadmaps'
      path: '/roadmaps'
      fullPath: '/roadmaps'
      preLoaderRoute: typeof RoadmapsImport
      parentRoute: typeof rootRoute
    }
    '/schools': {
      id: '/schools'
      path: '/schools'
      fullPath: '/schools'
      preLoaderRoute: typeof SchoolsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AdminRoute,
  CoursesRoute,
  LoginRoute,
  RegisterRoute,
  RoadmapsRoute,
  SchoolsRoute,
})

/* prettier-ignore-end */
