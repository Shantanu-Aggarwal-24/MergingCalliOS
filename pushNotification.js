const { Expo } = require('expo-server-sdk')

const pushNotification = async (deviceToken, msg) => {
    const sendNotifications = async (expo, messages) => {
        const chunks = expo.chunkPushNotifications(messages);
        const tickets = [];
        for (const chunk of chunks) {
          try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
          } catch (error) {
            console.error("error sending notifications", error);
          }
        }
      
        return tickets;
      }
      
        const expo = new Expo();
        
        // You can either get these tokens from the database
        // or pass them in your request
        const tokens = [deviceToken];
        
        const messages = [];
        for(token of tokens) {
          if (!Expo.isExpoPushToken(token)) {
            console.error(`Push token ${token} is not a valid Expo push token`);
            continue;
          }
          messages.push({
            to: token,
            title: 'kamlesh mehra',
            body: msg,
            data: { "_displayInForeground": true}
          });
        }
      
        try {
          await sendNotifications(expo, messages);
        } catch (error) {
          console.log('error', error);
        }
        
}

module.exports = pushNotification;

