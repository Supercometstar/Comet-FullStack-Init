exports.corsOptions = {
  origin: '*', // Allow this origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow these HTTP methods
  credentials: true // Allow cookies to be sent with requests
}