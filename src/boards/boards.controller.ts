import { Body, Controller, Get, Param, Post, Delete, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {BoardsService} from'./boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    // 1.
    // boardsService: BoardsService;
    // constructor(boardsService : BoardsService) {
    //     this.boardsService = boardsService;
    // }

    // 2.
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard():Board[] {
        return this.boardsService.getAllBoards();
    }
    @Get('/:id')
    getBoardById(@Param('id') id : string) {
        return this.boardsService.getBoardById(id);
    }
    @Delete('/:id')
    deleteBoard(@Param('id') id : string) {
        this.boardsService.deleteBoard(id);
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(
        // @Body('title') title: string,
        // @Body('description') description: string
        @Body() createBoardDto : CreateBoardDto
    ): Board {
        return this.boardsService.createBoard(createBoardDto)
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id : string, 
        @Body('status', BoardStatusValidationPipe) status:BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
    // this.boardsService.getAllBoards()
}