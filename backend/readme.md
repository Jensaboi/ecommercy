/_ eslint-disable _/

<!-- prettier-ignore-start -->

Middleware:

- auth middleware to check req.session.userId/sessionId
- admin middleware to check user role

Routes:

- /api/products -> productsRouter - "/" methods: GET (all products), POST(later for admins to add items) - "?type=type" methods GET(Filtering with query strings) - "/:id" methods: GET(get shoe with id of X etc...), DELETE/PUT(later for admins)

- /api/cart (Authmiddleware) -> cartRouter - "/:productId" DELETE(Delete item), PUT(Update quantity) - "/" GET(get all items), POST(add items), DELETE(Delete all items)

- /api/auth/me -> (Auth middleware ) meRouter - "/" GET(user info) - "/saved" GET(get saved items), POST(add items to list)

- /api/auth -> authRouter - "/login" method: POST(login with username, pw, email) - "/register" method: POST(register new user)
  Auth required on below: - "/delete" method: DELETE(for deleting their account) - "/logut" method: POST(Logut)

## TODOS

- authcontrollers -> deleteUser function

- orderControllers
<!-- prettier-ignore-end -->
