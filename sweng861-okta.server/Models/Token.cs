using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Data.Access.Library.Core;

namespace unit3.Server
{
    [DataTableAccessorAttribute("unit3.tokens")]
    public class Token
    {
        private int id;
        private string user;
        private string email;
        private string token;
        private string expires;

        public Token(string id, string user, string email, string token, string expires) : this(int.Parse(id), user, email, token, expires) { }

        public Token(int id, string user, string email, string token, string expires)
        {
            this.id = id;
            this.user = user;
            this.email = email;
            this.token = token;
            this.expires = expires;
        }

        [DataFieldAccessorAttribute("id")]
        public int Id { get => id; set => id = value; }

        public string User { get => user; set => user = value; }

        public string Email { get => email; set => email = value; }

        [DataFieldAccessorAttribute("token")]
        public string AccessToken { get => token; set => token = value; }

        public string Expires { get => expires; set => expires = value; }
    }
}
