import { Catch, ArgumentsHost, WsExceptionFilter, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class ChatExceptionFilter implements WsExceptionFilter {
  private readonly logger = new Logger(ChatExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();

    let message = 'An error occurred. Please try again later.';
    
    if (exception instanceof WsException) {
      const err = exception.getError();
      message = typeof err === 'string' ? err : (err as any).message || message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(`WebSocket exception caught: ${message}`, exception?.stack);

    // Send formatted system error message compatible with the frontend
    client.emit('message', [
      {
        sender: 'SYSTEM',
        message: message,
      },
    ]);
  }
}
