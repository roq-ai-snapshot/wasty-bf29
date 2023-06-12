import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { supermarketValidationSchema } from 'validationSchema/supermarkets';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSupermarkets();
    case 'POST':
      return createSupermarket();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSupermarkets() {
    const data = await prisma.supermarket
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'supermarket'));
    return res.status(200).json(data);
  }

  async function createSupermarket() {
    await supermarketValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.inventory_item?.length > 0) {
      const create_inventory_item = body.inventory_item;
      body.inventory_item = {
        create: create_inventory_item,
      };
    } else {
      delete body.inventory_item;
    }
    if (body?.waste_item?.length > 0) {
      const create_waste_item = body.waste_item;
      body.waste_item = {
        create: create_waste_item,
      };
    } else {
      delete body.waste_item;
    }
    const data = await prisma.supermarket.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
