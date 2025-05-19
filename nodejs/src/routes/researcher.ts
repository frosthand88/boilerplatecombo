import { Router } from 'express';
import { Researcher } from '../models/Researcher';
import { Op } from 'sequelize';

const router = Router();

/**
 * @openapi
 * /researchers:
 *   get:
 *     summary: Get paginated, sorted, and filtered list of researchers
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         default: 1
 *       - name: pageSize
 *         in: query
 *         schema:
 *           type: integer
 *         default: 10
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: [id, name, age, created_at]
 *         default: id
 *       - name: ascending
 *         in: query
 *         schema:
 *           type: boolean
 *         default: true
 *       - name: filter
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of researchers
 */
router.get('/postgres/researcher', async (req, res) => {
    const page = parseInt((req.query.page as string) || '1');
    const pageSize = parseInt((req.query.pageSize as string) || '10');
    const sortBy = (req.query.sortBy as string) || 'id';
    const ascending = req.query.ascending !== 'false'; // default true
    const filter = req.query.filter as string | undefined;

    const where = filter
        ? {
            name: {
                [Op.iLike]: `%${filter}%`,
            },
        }
        : {};

    const order: [string, 'ASC' | 'DESC'][] = [[sortBy, ascending ? 'ASC' : 'DESC']];

    const { count, rows } = await Researcher.findAndCountAll({
        where,
        order,
        limit: pageSize,
        offset: (page - 1) * pageSize,
    });

    res.json({ data: rows, totalCount: count });
});

export default router;
