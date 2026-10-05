import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
p.user.update({
  where: { email: 'admin@rwandabus.rw' },
  data: { name: 'Prince M Karn' }
}).then(console.log).finally(() => p.$disconnect())
