import { Request, Response, NextFunction } from 'express';
import { userRepository } from "@/api/user/userRepository";
import { extractToken, verifyJwt } from "../services/jwtService";
import { projectMemberRepository } from '@/api/project/projectRepository';
import { AuthenticatedRequest } from './authentication';
import { boardMemberRepository, boardRepository } from '@/api/board/boardRepository';

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
            console.log(accessIn);
            console.log(allowedRole);
            
            
            const token = extractToken(req);
            if (!token) {
                return res.sendStatus(401).json({ message: 'No token provided' });   
            }

            const decoded = verifyJwt(token) as JwtPayload;
            if (!decoded) {
                return res.sendStatus(401).json({ message: 'Invalid token' });    
            }    

            if(accessIn == 'project'){
                const projectId = req.params.projectId;
                const member = await projectMemberRepository.findByProjectAndUserIdAsync(projectId, decoded.userId);
                if (!member) {
                    return res.sendStatus(403).json({ message: 'Forbidden: No member found in this project' });              
                } 
                if (!member.role || !allowedRole.includes(member.role)) {
                    return res.sendStatus(403).json({ message: 'Forbidden' });
                }
            }

             if(accessIn == 'board'){
                const boardId = req.params.boardId;            
                const member = await boardMemberRepository.findByBoardAndUserIdAsync(boardId, decoded.userId);
                if (!member) {
                    return res.sendStatus(403).json({ message: 'Forbidden: No member found in this board' });
                    
                }            
                if (!member.role || !allowedRole.includes(member.role)) {
                    return res.sendStatus(403).json({ message: 'Forbidden' });
                }
             }         
            
            req.id = decoded.userId;
            next();
        } catch (error) {
            console.error("Error during role check: ", error);
            return res.sendStatus(401).json({ message: 'Unauthorized: Invalid token or server error' });
            
        }
    };
};
