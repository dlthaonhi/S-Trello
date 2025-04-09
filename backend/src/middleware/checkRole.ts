import { Request, Response, NextFunction } from 'express';
import { userRepository } from "@/api/user/userRepository";
import { extractToken, verifyJwt } from "../services/jwtService";
import { projectMemberRepository } from '@/api/project/projectRepository';
import { AuthenticatedRequest } from './authentication';
import { boardMemberRepository, boardRepository } from '@/api/board/boardRepository';
import { listRepository } from '@/api/list/listRepository';

interface JwtPayload {
    userId: string;
}

interface Permissions {
    id: string;
    action: string;
}

export const canAccessBy = (accessIn: string, ...allowedRole: string[]) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
        try {
            const token = extractToken(req);
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decoded = verifyJwt(token) as JwtPayload;
            if (!decoded) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            if (accessIn == 'project') {
                const projectId = req.params.projectId;
                const member = await projectMemberRepository.findByProjectAndUserIdAsync(projectId, decoded.userId);
                if (!member) {
                    return res.status(403).json({ message: 'Forbidden: No member found in this project' });
                }
                if (!member.role || !allowedRole.includes(member.role)) {
                    return res.status(403).json({ message: 'Forbidden' });
                }
            }

            if (accessIn == 'board') {
                const boardId = req.params.boardId;
                
                const member = await boardMemberRepository.findByBoardAndUserIdAsync(boardId, decoded.userId);
                if (!member) {
                    return res.status(403).json({ message: 'Forbidden: No member found in this board' });
                }
                console.log(member);
                
                if (!member.role || !allowedRole.includes(member.role)) {
                    return res.status(403).json({ message: 'Forbidden' });
                }
            }

            if(accessIn == 'list') {
                const listId = req.params.listId;
                const list  = await listRepository.findByListIdAndRelationAsync(listId, ['boardID']);
                if (!list) {
                    return res.status(403).json({ message: 'Forbidden: No list found' });
                }
                const member = await boardMemberRepository.findByBoardAndUserIdAsync(list.boardID.id, decoded.userId);
                if (!member) {
                    return res.status(403).json({ message: 'Forbidden: No member found in this board' });
                }
                if (!member.role || !allowedRole.includes(member.role)) {
                    return res.status(403).json({ message: 'Forbidden' });
                }
            }

            req.id = decoded.userId;
            next();
        } catch (error) {
            console.error("Error during role check: ", error);
            return res.status(401).json({ message: 'Unauthorized: Invalid token or server error' });

        }
    };
};
