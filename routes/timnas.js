// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const timnasController = require("../controllers/timnasController");

// endpoint
router.get("/", timnasController.viewTimnas); // Untuk view
router.post("/", timnasController.addTimnas); // Untuk add
router.put("/", timnasController.editTimnas); // Untuk edit
router.delete("/:id", timnasController.deleteTimnas); //delete

// Lalu export routernya
module.exports = router;