import React from 'react'
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import AuthLayout from './layouts/AuthLayout'
import UserLayout from './layouts/UserLayout'
import AdminPage from './components/pages/admin/AdminPage'
import CartPage from './components/pages/CartPage'
import PageNotFound from './components/pages/notifications/PageNotFound'
import LoginPage from './components/pages/auth/LoginPage'
import SignupPage from './components/pages/auth/SignupPage'
import KnivesListPage from './components/pages/KnivesListPage'
import KnifeDetailPage from './components/pages/KnifeDetailPage'
import UserPage from './components/pages/user/UserPage'
import EditUserPage from './components/pages/user/EditUserPage'
import LogOut from './layouts/LogOut'
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminKnifeAddPage from './components/pages/admin/AdminKnifeAddPage'
import AdminKnifeEditPage from './components/pages/admin/AdminKnifeEditPage'
import AppLoader from './components/ui/hoc/AppLoader'
import OrderPage from './components/pages/OrderPage'
import OrderAccepted from './components/pages/notifications/OrderAccepted'
import UserOrdersPage from './components/pages/user/UserOrdersPage'
import UserOrderDetailPage from './components/pages/user/UserOrderDetailPage'
import FavoritesListPage from './components/pages/user/FavoritesListPage'

const App = () => {
  history.navigate = useNavigate()
  history.location = useLocation()

  return (
    <>
      <AppLoader>
        <NavBar />
        <Routes>
          <Route path='/' element={<Outlet />}>
            <Route index element={<KnivesListPage />} />
            <Route path='knives/:knifeId' element={<KnifeDetailPage />} />
          </Route>

          <Route path='auth' element={<AuthLayout />}>
            <Route index element={<Navigate to='/auth/login' />} />
            <Route path='*' element={<Navigate to='/auth/login' />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />
          </Route>
          <Route path='logout' element={<LogOut />} />

          <Route
            path='user'
            element={
              <ProtectedRoute
                redirectTo={'/auth/login'}
                element={<UserLayout />}
              />
            }
          >
            <Route path=':userId' element={<Outlet />}>
              <Route index element={<Navigate to='profile' />} />
              <Route path='profile' element={<UserPage />} />
              <Route path='edit' element={<EditUserPage />} />
              <Route path='favorites' element={<FavoritesListPage />} />
              <Route path='orders' element={<Outlet />}>
                <Route index element={<UserOrdersPage />} />
                <Route path=':orderId' element={<UserOrderDetailPage />} />
              </Route>
            </Route>
          </Route>

          <Route
            path='admin'
            element={
              <ProtectedRoute
                redirectTo={'/auth/login'}
                element={<Outlet />}
                adminRoute
              />
            }
          >
            <Route index element={<AdminPage />} />
            <Route path='knives/add' element={<AdminKnifeAddPage />} />
            <Route
              path='knives/:knifeId/edit'
              element={<AdminKnifeEditPage />}
            />
          </Route>

          <Route
            path='cart'
            element={
              <ProtectedRoute
                redirectTo={'/auth/login'}
                element={<CartPage />}
              />
            }
          />

          <Route
            path='order'
            element={
              <ProtectedRoute
                redirectTo={'/auth/login'}
                element={<OrderPage />}
              />
            }
          />

          <Route path='order-accepted' element={<OrderAccepted />} />
          <Route path='page-not-found' element={<PageNotFound />} />
          <Route path='*' element={<Navigate replace to='/page-not-found' />} />
        </Routes>
      </AppLoader>
    </>
  )
}

export default App
