import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { wasteItemValidationSchema } from 'validationSchema/waste-items';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.waste_item
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getWasteItemById();
    case 'PUT':
      return updateWasteItemById();
    case 'DELETE':
      return deleteWasteItemById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWasteItemById() {
    const data = await prisma.waste_item.findFirst(convertQueryToPrismaUtil(req.query, 'waste_item'));
    return res.status(200).json(data);
  }

  async function updateWasteItemById() {
    await wasteItemValidationSchema.validate(req.body);
    const data = await prisma.waste_item.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteWasteItemById() {
    const data = await prisma.waste_item.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
