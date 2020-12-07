using System;
using System.Collections.Generic;

namespace Gamestak.Entities
{
    public class Game
    {
        // Identifiers
        public int GameID { get; set; }
        public string Title { get; set; }

        // Descriptors
        public string Publisher { get; set; }
        public string Description { get; set; }
        public double Price { get; set; } = 0.00;
        public double DiscountRate { get; set; } = 0.00;

        // Resources
        public string ThumbnailUrl { get; set; }
        public List<GameImage> ImageCollection { get; set; } = new List<GameImage>();

        // Metadata
        public DateTime ReleaseDate { get; set; } = DateTime.UtcNow;
    }
}
