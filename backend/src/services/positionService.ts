import { cardRepository } from "@/api/card/cardRepository";
import { Cards } from "@/model/projects/cards.entity";

class positionService {
    async increase (oldPosition: number, newPosition: number, listId: string): Promise<boolean | null> {
        console.log("vao increase");
        
        for (let i = oldPosition +1; i <= newPosition; i++) {
            const changeCard = await cardRepository.findByListIdAndPositionAsync(listId, i);
            if (!changeCard) return false;
            changeCard.position = i - 1;            
            const changedCard = await cardRepository.updateCardByIdAsync(changeCard.id, changeCard);
            if (!changedCard) return false;
        }
        return true;
    }
    async decrease (oldPosition: number, newPosition: number, listId: string): Promise<boolean | null> {
        console.log("vao decrease");

        for (let i = newPosition; i < oldPosition; i++) {
            const changeCard = await cardRepository.findByListIdAndPositionAsync(listId, i);
            console.log(`Card found: ${changeCard ? changeCard.id : 'None'}`);
            if (!changeCard) {
                console.log(`Card not found at position ${i} in list ${listId}`);
                return false;
            }
            changeCard.position = i + 1;
            const changedCard = await cardRepository.updateCardByIdAsync(changeCard.id, changeCard);
            if (!changedCard) return false;
        }
        return true;
    }
    async add (newPosition: number, maxPosition: number, newListId: string): Promise<boolean | null> {
        console.log("Vao add");
        
        for (let i = newPosition; i < maxPosition; i++) {
            const changeCard = await cardRepository.findByListIdAndPositionAsync(newListId, i);
            if (!changeCard) return false;
            changeCard.position = i + 1;
            const changedCard = await cardRepository.updateCardByIdAsync(changeCard.id, changeCard);
            if (!changedCard) return false;
        }
        return true;
    }
    async remove (oldPosition: number, oldListId: string): Promise<boolean | null> {
        console.log("Vao remove");
        const maxPosition = await cardRepository.countCardsByListIdAsync(oldListId);
        for (let i = oldPosition +1; i <= maxPosition; i++) {
            const changeCard = await cardRepository.findByListIdAndPositionAsync(oldListId, i);
            if (!changeCard) return false;
            changeCard.position = i - 1;
            const changedCard = await cardRepository.updateCardByIdAsync(changeCard.id, changeCard);
            if (!changedCard) return false;
        }
        return true;
    }
}

export default new positionService();