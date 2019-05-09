var controllerFactory = () => {
    let controller = {}

    controller.GET = (req, res) => {
        res.status(200).json({
          'status' : 'ok',
          'uuid' : req.uuid
        })

    }

    controller.GET.apiDoc = `
          description: 'Get list of forest'
          operationId: listForest
          security:
          - Bearer: []
          responses:
            200:
              description: successful operation`

    return controller
}

module.exports = controllerFactory
