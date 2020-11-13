using System;
using System.Collections.Generic;

namespace Gamestak.Entities
{
    public class GameCreationRequest
    {
        // Identifiers
        public string Title { get; set; }

        // Descriptors
        public string Description { get; set; }
        public double Price { get; set; } = 0.00;

        // Resources
        public string HeroImageUrl { get; set; }
        public List<string> ImageCollection { get; set; } = new List<string>();

        // Metadata
        public DateTime ReleaseDate { get; set; } = DateTime.UtcNow;
    }
}
