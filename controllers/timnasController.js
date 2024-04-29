const Timnas = require("../models/Timnas");

module.exports = {
    viewTimnas: async (req, res) => {
        try {
            const timnas = await Timnas.find();
            // Membuat variabel untuk alertMessage  dan alertStatus
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
            const alert = { message: alertMessage, status: alertStatus };

            res.render("index", {
                timnas,
                alert,
                title: "CRUD Timnas",
            });
        } catch (error) {
            res.redirect("/timnas");
        }
    },

    // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
    addTimnas: async (req, res) => {
        // memberi validasi untuk inputan yang kosong
        try {
            const { nama, noPunggung, posisi, foto, klub, naturalisasi } = req.body;
            await Timnas.create({ nama, noPunggung, posisi, foto, klub, naturalisasi });
            // ketika create data berhasil memberikan notifikasi
            req.flash("alertMessage", "Data timnas berhasil ditambahkan");
            req.flash("alertStatus", "success");
            res.redirect("/timnas"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
        } catch (error) {
            // ketika create data error memberikan notifikasi
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            // ketika inputan kosong, maka redirect kehalaman
            res.redirect("/timnas");
        }
    },

    editTimnas: async (req, res) => {
        try {
            // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
            const { id, nama, noPunggung, posisi, foto, klub, naturalisasi } = req.body;
            /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
         _id didapat database dan id isinya dari inputan user */
            const timnas = await Timnas.findOne({ _id: id });

            timnas.nama = nama;
            timnas.noPunggung = noPunggung;
            timnas.posisi = posisi;
            timnas.foto = foto;
            timnas.klub = klub;
            timnas.naturalisasi = naturalisasi;
            // Menyimpan datanya ke database
            await timnas.save();
            // ketika edit data berhasill memberikan notifikasi/alert
            req.flash("alertMessage", "Data berhasil diubah");
            req.flash("alertStatus", "success");
            res.redirect("/timnas");
        } catch (error) {
            // ketika edit data error memberikan notifikasi erronya
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/timnas");
        }
    },


    deleteTimnas: async (req, res) => {
        try {
            /*
        Membuat variabel yang menerima id yang didapat dari params
        id didapat database dan id isinya dari params
        */
            const { id } = req.params;
            const timnas = await Timnas.findOne({ _id: id });
            // setelah datanya sudah didapat maka menghapusnya
            await timnas.deleteOne();
            // ketika delete data memberikan notifikasi
            req.flash("alertMessage", "Data berhasil dihapus");
            req.flash("alertStatus", "warning");
            // setelah berhasil remove maka melakukan redirect
            res.redirect("/timnas");
        } catch (error) {
            // ketika create data error memberikan notifikasi
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            // ketika inputa kosong redirect kehalaman
            res.redirect("/timnas");
        }
    },

    //   Mengelola detail.ejs
    // timnasController.js 
// Di dalam fungsi getDetailPlayer di file timnasController.js

getDetailPlayer: async (req, res) => {
    try {
        const playerId = req.query.id;
        const player = await Timnas.findById(playerId);

        if (!player) {
            return res.status(404).send('Pemain tidak ditemukan');
        }

        res.render('detail', {
            title: 'Detail Pemain',
            player: player // Mengirimkan objek pemain ke template detail.ejs
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Terjadi kesalahan saat memuat detail pemain.');
    }
}

};