import prisma from "./client";

async function main() {
  await prisma.map.deleteMany();

  const aquarium = await prisma.map.create({
    data: {
      name: "Aquatic Aquarium",
      image: '/assets/aquatic-aquarium.webp',
      characters: {
        create: [
          {
            name: 'Starmie',
            image: '/assets/starmie.webp',
            yMin: 0.6010965211388158,
            yMax: 0.669882514707999,
            xMin: 0.8356624358242019,
            xMax: 0.8995928953954523
          },
          {
            name: 'Feebas',
            image: '/assets/feebas.webp',
            yMin: 0.47057950769985313,
            yMax: 0.5287830407199311,
            xMin: 0.07991307446406301,
            xMax: 0.12786091914250083,
          },
          {
            name: 'Mantyke',
            image: '/assets/mantyke.webp',
            yMin: 0.28891393494021583,
            yMax: 0.33124377713663616,
            xMin: 0.9338413558800507,
            xMax: 0.9760811238110554
          }
        ]
      }
    }
  })

  const dragon = await prisma.map.create({
    data: {
      name: "Dragon Charmer's Island",
      image: '/assets/dragon-charmers-island.webp',
      characters: {
        create: [
          {
            name: 'Dragon',
            image: '/assets/dragon.png',
            yMin: 0.4178352571253219,
            yMax: 0.43562958016914005,
            xMin: 0.6495791338578837,
            xMax: 0.6804027482940223
          },
          {
            name: 'Wizard',
            image: '/assets/wizard.png',
            yMin: 0.6500189965140805,
            yMax: 0.6686221524235267,
            xMin: 0.7454748232147593,
            xMax: 0.7705903609034648
          },
          {
            name: 'Raft Man',
            image: '/assets/raft-man.png',
            yMin: 0.41230985960549255,
            yMax: 0.4341483469774512,
            xMin: 0.03767330653305828,
            xMax: 0.0627888442217638
          }
        ]
      }
    }
  })

  const mario = await prisma.map.create({
    data: {
      name: 'Super Mario Bros',
      image: '/assets/super-mario-bros.webp',
      characters: {
        create: [
          {
            name: 'Fire Mario',
            image: '/assets/fire-mario.webp',
            yMin: 0.4319758191249888,
            yMax: 0.4841555444242453,
            xMin: 0.8139717441839561,
            xMax: 0.8858935112016129
          },
          {
            name: 'King Boo',
            image: '/assets/king-boo.webp',
            yMin: 0.5241056466064886,
            yMax: 0.5852537621915548,
            xMin: 0.27398768387678746,
            xMax: 0.3413429894964977
          },
          {
            name: 'Waluigi',
            image: '/assets/waluigi.webp',
            yMin: 0.905748450347113,
            yMax: 0.9913558121662058,
            xMin: 0.6689865947991561,
            xMax: 0.7420499771662994
          }
        ]
      }
    }
  })
  
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding complete');
    await prisma.$disconnect();
  });
