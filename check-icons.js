const https = require('https');

const icons = [
  'newspaper', 'books', 'cardboard-box', 'magazine',
  'anvil', 'beam', 'steel', 'metal', 'can', 'soda-can', 'tin-can', 'copper-wire', 'wire', 'cable', 'gold-bars',
  'plastic-bottle', 'jerrycan', 'trash-can',
  'air-conditioner', 'refrigerator', 'fridge', 'washing-machine', 'microwave', 'fan', 'desk-fan', 'engine', 'car-battery', 'battery',
  'water-heater', 'laptop', 'monitor', 'workstation', 'retro-tv', 'printer', 'air-cooler', 'motherboard', 'plugin', 'water-purifier'
];

async function check() {
  for (const icon of icons) {
    const url = `https://img.icons8.com/3d-fluency/250/${icon}.png`;
    await new Promise(resolve => {
      https.get(url, (res) => {
        if (res.statusCode === 200) {
          console.log(`✅ ${icon} EXISTS`);
        } else {
          console.log(`❌ ${icon} FAILED (${res.statusCode})`);
        }
        resolve();
      }).on('error', () => {
        console.log(`❌ ${icon} FAILED (Network Error)`);
        resolve();
      });
    });
  }
}

check();
