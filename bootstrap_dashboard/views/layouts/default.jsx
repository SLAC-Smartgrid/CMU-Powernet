var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="" />
          <meta name="author" content="" />
          <title>{this.props.title}</title>


          <link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
          <link href="/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet" />
          <link href="/bower_components/font-awesome/css/font-awesome.min.css" rel="styleshe et" type="text/css" />
        </head>

        <body>
          <div id="wrapper">
            <div id="react-navigation">
            </div>

            <div id="page-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Dashboard</h1>
                    </div>
                </div>
                {this.props.children}
            </div>
          </div>

          <script src="/bower_components/jquery/dist/jquery.min.js"></script>
          <script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
          <script src="/bower_components/metisMenu/dist/metisMenu.min.js"></script>
          <script src="/dist/js/bootstrap.js"></script>
          <script src="/dist/js/index.js"></script>
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;
