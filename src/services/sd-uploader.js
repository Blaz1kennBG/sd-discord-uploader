const fs = require("fs");

class StableDiffusionUploader {
  constructor({ name, channelId, channel, client }) {
    this.name = name;
    this.channelId = channelId;
    this.channel = channel;
    this.client = client;
    this.queue = [];
    this.isProcessing = false;
    this.interval = null;
  }

  async upload(images) {
    images.forEach((image) => {
      const parsedImage = image.split(",")[1];
      this.queue.push(parsedImage);
    });
  }

  async processImage(image) {
    const discordRateLimitCooldown = 3000;
    await new Promise((resolve) =>
      setTimeout(resolve, discordRateLimitCooldown)
    );
    this.isProcessing = true;
    const fileDirName = `./image_buffer/buffer.png`;
    fs.writeFileSync(fileDirName, image, {
      encoding: "base64",
    });
    try {
      // Send the image to the channel
      await this.channel.send({ content: "", files: [fileDirName] });
      this.isProcessing = false;
    } catch (error) {
      console.error(error);
      this.isProcessing = false;
    }
  }

  start() {
    this.interval = setInterval(() => {
      if (this.queue.length > 0 && !this.isProcessing) {
        const image = this.queue.shift();
        this.processImage(image);
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  async init() {
    setTimeout(async () => {
      this.channel = await this.client.channels.cache.get(this.channelId);
      console.log("Messages forwarded to channel >>> ", this.channel.name);
      this.start();
    }, 2000);
  }
}

module.exports = {
  StableDiffusionUploader,
};
