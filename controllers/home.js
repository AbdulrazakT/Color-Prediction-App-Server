const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 6fc24f55aea942b9ad5ac47f20cf10e5");

const handleHome = (req, res) => {
  const { url } = req.body;

  stub.PostModelOutputs(
    {
      // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
      model_id: "eeed0b6733a644cea07cf4c60f87ebb7",
      inputs: [{ data: { image: { url: url } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log(
          "Received failed status: " +
            response.status.description +
            "\n" +
            response.status.details
        );
        return;
      }

      let colors = response.outputs[0].data.colors;

      let predictedColors = [];
      colors.map((element) =>
        predictedColors.push({
          name: element.w3c.name,
          probability: element.value,
        })
      );
      res.json(predictedColors);
    }
  );
};

module.exports = {
  handleHome,
};
