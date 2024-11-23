import { Request, Response, NextFunction } from 'express';
import { userRepository } from "@/api/user/userRepository";
import { extractToken, verifyJwt } from "../services/jwtService";
import { projectMemberRepository } from '@/api/project/projectRepository';
import { AuthenticatedRequest } from './authentication';

interface JwtPayload {
    userId: string;
}


interface Permissions {
    id: string;
    action: string;
}

export const canAccessProject = (...allowedRole: string[]) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
        try {

            const token = extractToken(req);
            if (!token) {
                return res.sendStatus(401).json({ message: 'No token provided' });
                
            }

            const decoded = verifyJwt(token) as JwtPayload;
            if (!decoded) {
                return res.sendStatus(401).json({ message: 'Invalid token' });
                
            }            
            const projectId = req.params.projectId;
            const member = await projectMemberRepository.findByProjectAndUserIdAsync(projectId, decoded.userId);
            if (!member) {
                return res.sendStatus(403).json({ message: 'Forbidden: No member found in this project' });
                
            }            
            if (!member.role || !allowedRole.includes(member.role)) {
                return res.sendStatus(403).json({ message: 'Forbidden: No role found' });
            }
            req.id = decoded.userId;
            next();
        } catch (error) {
            console.error("Error during role check: ", error);
            return res.sendStatus(401).json({ message: 'Unauthorized: Invalid token or server error' });
            
        }
    };
};
