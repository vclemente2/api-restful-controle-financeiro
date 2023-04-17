const logarUsuario = (req, res) => {
    const usuario = req.usuario

    const token = jwt.sign({ id: usuario.id }, senhaToken, { expiresIn: '8h' })
    return res.status(201).json({ usuario, token })
}