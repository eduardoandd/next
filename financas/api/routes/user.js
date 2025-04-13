import express from 'express'

const router = express.Router()

router.get("/teste", (req, res) => {
    res.status(200).json({msg:"funcionando"})
})

export default router
