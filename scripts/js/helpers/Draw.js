export class Draw {
    static clearScreen(ctx, windowSize) {
        ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    }
    static rectangle(ctx, position, size, color = "black") {
        ctx.fillStyle = color;
        ctx.fillRect(position.x, position.y, size.width, size.height);
    }
    static text(text, ctx, position, color = "white") {
        ctx.font = "48px Verdana";
        ctx.fillStyle = color;
        ctx.fillText(text, position.x, position.y);
    }
    static boxText(text, ctx, position, box, color = "white") {
        ctx.font = "48px Verdana";
        const textWidth = ctx.measureText(text);
        ctx.fillStyle = color;
        ctx.fillText(text, position.x + box.width / 2 - textWidth.width / 2, position.y + 65);
    }
    static image(image, ctx, position, box) {
        ctx.drawImage(image, position.x, position.y);
    }
}
//# sourceMappingURL=Draw.js.map