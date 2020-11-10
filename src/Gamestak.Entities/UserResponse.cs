﻿using System;

namespace Gamestak.Entities
{
    /// <summary>
    /// User object without the password.
    /// </summary>
    public class UserResponse
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
